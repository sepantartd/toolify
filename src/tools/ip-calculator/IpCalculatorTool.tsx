import React, { useState } from 'react';
import { ToolProps } from '../../core/types/tool';
import { Network, Copy, Check } from 'lucide-react';

export const IpCalculatorTool: React.FC<ToolProps> = () => {
  const [cidr, setCidr] = useState<string>('192.168.1.1/24');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const calculateSubnet = (cidrStr: string) => {
    const parts = cidrStr.trim().split('/');
    if (parts.length !== 2) return null;

    const ip = parts[0];
    const maskBits = parseInt(parts[1], 10);

    if (isNaN(maskBits) || maskBits < 0 || maskBits > 32) return null;

    const ipParts = ip.split('.').map(Number);
    if (ipParts.length !== 4 || ipParts.some((p) => isNaN(p) || p < 0 || p > 255)) return null;

    const ipNum = (ipParts[0] << 24) | (ipParts[1] << 16) | (ipParts[2] << 8) | ipParts[3];
    const maskNum = maskBits === 0 ? 0 : (~0 << (32 - maskBits)) >>> 0;
    const netNum = (ipNum & maskNum) >>> 0;
    const bcastNum = (netNum | ~maskNum) >>> 0;

    const numToIp = (n: number) =>
      [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join('.');

    const totalHosts = Math.pow(2, 32 - maskBits);
    const usableHosts = maskBits >= 31 ? totalHosts : Math.max(0, totalHosts - 2);

    return {
      networkAddress: numToIp(netNum),
      broadcastAddress: numToIp(bcastNum),
      subnetMask: numToIp(maskNum),
      firstHost: maskBits >= 31 ? numToIp(netNum) : numToIp(netNum + 1),
      lastHost: maskBits >= 31 ? numToIp(bcastNum) : numToIp(bcastNum - 1),
      totalHosts: totalHosts.toLocaleString(),
      usableHosts: usableHosts.toLocaleString()
    };
  };

  const result = calculateSubnet(cidr);

  const handleCopy = async (val: string, key: string) => {
    if (!val) return;
    try {
      await navigator.clipboard.writeText(val);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  return (
    <div className="space-y-4 text-right" dir="rtl">
      {/* ورودی CIDR */}
      <div className="bg-slate-950/60 p-4 rounded-lg border border-slate-800 space-y-2">
        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
          <Network className="w-4 h-4 text-indigo-400" />
          آدرس IP به همراه Prefix (CIDR):
        </label>
        <input
          type="text"
          value={cidr}
          onChange={(e) => setCidr(e.target.value)}
          placeholder="مثلاً 10.0.0.1/16"
          className="w-full p-2.5 bg-slate-900 text-cyan-400 font-mono text-sm rounded border border-slate-700 focus:outline-none focus:border-indigo-500"
          dir="ltr"
        />
      </div>

      {/* نتایج محاسبات */}
      {result ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3" dir="ltr">
          {[
            { label: 'Network Address', key: 'net', val: result.networkAddress },
            { label: 'Broadcast Address', key: 'bcast', val: result.broadcastAddress },
            { label: 'Subnet Mask', key: 'mask', val: result.subnetMask },
            { label: 'Usable Host Range', key: 'range', val: `${result.firstHost} - ${result.lastHost}` },
            { label: 'Total IPs', key: 'total', val: result.totalHosts },
            { label: 'Usable Hosts', key: 'usable', val: result.usableHosts }
          ].map((item) => (
            <div key={item.key} className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-indigo-400 font-mono">{item.label}</span>
                <button
                  onClick={() => handleCopy(item.val, item.key)}
                  className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 transition-colors"
                >
                  {copiedKey === item.key ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                  Copy
                </button>
              </div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800 font-mono text-xs text-slate-200">
                {item.val}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 bg-red-950/40 border border-red-900/60 rounded-lg text-red-300 text-xs text-center font-mono" dir="ltr">
          Invalid CIDR notation format. Example: 192.168.1.1/24
        </div>
      )}
    </div>
  );
};
    
