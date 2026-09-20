import { toolRegistry } from './toolRegistry';

// ثبت تمام مانیفست‌ها و لودرهای دینامیک ابزارهای فاز ۴ تا ۱۲

export function initToolRegistry() {
  // فاز ۴: JSON Formatter & Hash Generator
  toolRegistry.register(
    require('../../tools/json-formatter/manifest.json'),
    () => import('../../tools/json-formatter')
  );
  toolRegistry.register(
    require('../../tools/hash-generator/manifest.json'),
    () => import('../../tools/hash-generator')
  );

  // فاز ۵: Base64 Encoder & UUID Generator
  toolRegistry.register(
    require('../../tools/base64-encoder/manifest.json'),
    () => import('../../tools/base64-encoder')
  );
  toolRegistry.register(
    require('../../tools/uuid-generator/manifest.json'),
    () => import('../../tools/uuid-generator')
  );

  // فاز ۶: RegEx Tester & Color Picker
  toolRegistry.register(
    require('../../tools/regex-tester/manifest.json'),
    () => import('../../tools/regex-tester')
  );
  toolRegistry.register(
    require('../../tools/color-picker/manifest.json'),
    () => import('../../tools/color-picker')
  );

  // فاز ۷: Minifier & Diff Checker
  toolRegistry.register(
    require('../../tools/code-minifier/manifest.json'),
    () => import('../../tools/code-minifier')
  );
  toolRegistry.register(
    require('../../tools/diff-checker/manifest.json'),
    () => import('../../tools/diff-checker')
  );

  // فاز ۸: QR Code Generator & Lorem Ipsum Generator
  toolRegistry.register(
    require('../../tools/qr-generator/manifest.json'),
    () => import('../../tools/qr-generator')
  );
  toolRegistry.register(
    require('../../tools/lorem-generator/manifest.json'),
    () => import('../../tools/lorem-generator')
  );

  // فاز ۹: Password Generator & Word Counter
  toolRegistry.register(
    require('../../tools/password-generator/manifest.json'),
    () => import('../../tools/password-generator')
  );
  toolRegistry.register(
    require('../../tools/word-counter/manifest.json'),
    () => import('../../tools/word-counter')
  );

  // فاز ۱۰: Base64 Image & Markdown Converter
  toolRegistry.register(
    require('../../tools/base64-image/manifest.json'),
    () => import('../../tools/base64-image')
  );
  toolRegistry.register(
    require('../../tools/markdown-preview/manifest.json'),
    () => import('../../tools/markdown-preview')
  );

  // فاز ۱۱: URL Encoder & User Agent Parser
  toolRegistry.register(
    require('../../tools/url-encoder/manifest.json'),
    () => import('../../tools/url-encoder')
  );
  toolRegistry.register(
    require('../../tools/user-agent-parser/manifest.json'),
    () => import('../../tools/user-agent-parser')
  );

  // فاز ۱۲: Math Evaluator & CSV to JSON
  toolRegistry.register(
    require('../../tools/math-evaluator/manifest.json'),
    () => import('../../tools/math-evaluator')
  );
  toolRegistry.register(
    require('../../tools/csv-to-json/manifest.json'),
    () => import('../../tools/csv-to-json')
  );
}
