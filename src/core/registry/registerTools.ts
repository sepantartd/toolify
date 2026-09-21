import { toolRegistry } from './toolRegistry';

// ایمپورت مانیفست ابزارهای اصلی موجود
import jsonFormatterManifest from '../../tools/json-formatter/manifest.json';
import hashGeneratorManifest from '../../tools/hash-generator/manifest.json';
import uuidGeneratorManifest from '../../tools/uuid-generator/manifest.json';
import passwordGeneratorManifest from '../../tools/password-generator/manifest.json';
import colorPickerManifest from '../../tools/color-picker/manifest.json';

export function initToolRegistry() {
  try {
    toolRegistry.register(
      jsonFormatterManifest as any,
      () => import('../../tools/json-formatter').then((m) => m.default)
    );
    toolRegistry.register(
      hashGeneratorManifest as any,
      () => import('../../tools/hash-generator').then((m) => m.default)
    );
    toolRegistry.register(
      uuidGeneratorManifest as any,
      () => import('../../tools/uuid-generator').then((m) => m.default)
    );
    toolRegistry.register(
      passwordGeneratorManifest as any,
      () => import('../../tools/password-generator').then((m) => m.default)
    );
    toolRegistry.register(
      colorPickerManifest as any,
      () => import('../../tools/color-picker').then((m) => m.default)
    );
  } catch (e) {
    console.error('Error initializing tool registry:', e);
  }
}
    uuidGeneratorManifest as any,
    () => import('../../tools/uuid-generator').then((m) => m.default)
  );
  toolRegistry.register(
    regexTesterManifest as any,
    () => import('../../tools/regex-tester').then((m) => m.default)
  );
  toolRegistry.register(
    colorPickerManifest as any,
    () => import('../../tools/color-picker').then((m) => m.default)
  );
  toolRegistry.register(
    codeMinifierManifest as any,
    () => import('../../tools/code-minifier').then((m) => m.default)
  );
  toolRegistry.register(
    diffCheckerManifest as any,
    () => import('../../tools/diff-checker').then((m) => m.default)
  );
  toolRegistry.register(
    qrGeneratorManifest as any,
    () => import('../../tools/qr-generator').then((m) => m.default)
  );
  toolRegistry.register(
    loremGeneratorManifest as any,
    () => import('../../tools/lorem-generator').then((m) => m.default)
  );
  toolRegistry.register(
    passwordGeneratorManifest as any,
    () => import('../../tools/password-generator').then((m) => m.default)
  );
  toolRegistry.register(
    wordCounterManifest as any,
    () => import('../../tools/word-counter').then((m) => m.default)
  );
  toolRegistry.register(
    base64ImageManifest as any,
    () => import('../../tools/base64-image').then((m) => m.default)
  );
  toolRegistry.register(
    markdownPreviewManifest as any,
    () => import('../../tools/markdown-preview').then((m) => m.default)
  );
  toolRegistry.register(
    urlEncoderManifest as any,
    () => import('../../tools/url-encoder').then((m) => m.default)
  );
  toolRegistry.register(
    userAgentParserManifest as any,
    () => import('../../tools/user-agent-parser').then((m) => m.default)
  );
  toolRegistry.register(
    mathEvaluatorManifest as any,
    () => import('../../tools/math-evaluator').then((m) => m.default)
  );
  toolRegistry.register(
    csvToJsonManifest as any,
    () => import('../../tools/csv-to-json').then((m) => m.default)
  );
    }
