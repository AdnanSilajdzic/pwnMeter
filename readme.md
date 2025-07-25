# PwnMeter

A modern React component for real-time password strength visualization and security analysis. Built with TypeScript and powered by zxcvbn-ts for accurate password strength assessment.

## Features

### ✅ Implemented
- **Real-time password strength analysis** using zxcvbn-ts algorithm
- **Visual strength meter** with color-coded bars (weak to strong)
- **HaveIBeenPwned integration** to check against known data breaches
- **Detailed feedback tooltips** with improvement suggestions
- **TypeScript support** with full type definitions
- **Responsive design** that works on all screen sizes
- **Customizable styling** through CSS classes
- **Callback support** for handling strength changes
- **Tooltip toggle** to show/hide detailed feedback
- **Warning visibility control** to hide breach warnings

### 🚧 Planned Features
- **Disable HaveIBeenPwned checking** (`disablePwnd` prop) - Skip breach database checks
- **Custom debounce timing** (`debounceTime` prop) - Control API call frequency
- **Advanced debounce control** (`debounce` prop) - Enable/disable input debouncing
- **Multi-language support** (`language` prop) - Support for languages beyond English (French, German, Spanish, etc.)

## Installation

```bash
npm install pwnmeter
```

## Usage

### Basic Usage

```tsx
import React, { useState } from 'react';
import { PwnMeter } from 'pwnmeter';
import 'pwnmeter/style.css';

function App() {
  const [password, setPassword] = useState('');

  return (
    <div>
      <input 
        type="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
      />
      <PwnMeter password={password} />
    </div>
  );
}
```

### Advanced Usage with Callback

```tsx
import React, { useState } from 'react';
import { PwnMeter } from 'pwnmeter';
import 'pwnmeter/style.css';

function App() {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(null);

  const handleStrengthChange = (result) => {
    setStrength(result);
    console.log('Password strength:', result.score);
    console.log('Feedback:', result.feedback);
  };

  return (
    <div>
      <input 
        type="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
      />
      <PwnMeter 
        password={password}
        callback={handleStrengthChange}
        disableTooltip={false}
        hideWarning={false}
      />
      {strength && (
        <p>Password strength: {strength.score}/4</p>
      )}
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `password` | `string` | **Required** | The password to analyze |
| `callback` | `Function` | `undefined` | Callback function called with strength analysis results |
| `disablePwnd` | `boolean` | `false` | ⚠️ *Coming soon* - Disable HaveIBeenPwned breach checking |
| `debounce` | `boolean` | `true` | ⚠️ *Coming soon* - Enable/disable input debouncing |
| `debounceTime` | `number` | `300` | ⚠️ *Coming soon* - Debounce delay in milliseconds |
| `disableTooltip` | `boolean` | `false` | Hide the information tooltip |
| `hideWarning` | `boolean` | `false` | Hide breach warning messages |

## Styling

The component comes with default styles, but you can customize the appearance using CSS:

```css
/* Main container */
.pwn-meter {
  /* Customize the meter container */
}

/* Individual strength bars */
.pwn-bar {
  /* Customize strength indicator bars */
}

/* Information icon */
.pwn-information-icon {
  /* Customize the info icon */
}

/* Tooltip styles */
.pwn-tooltip {
  /* Customize tooltip appearance */
}
```

## Password Strength Levels

The component uses the industry-standard zxcvbn algorithm to evaluate passwords:

- **0 - Very Weak**: Too guessable, risky password
- **1 - Weak**: Very guessable, protection from throttled online attacks
- **2 - Fair**: Somewhat guessable, protection from unthrottled online attacks  
- **3 - Good**: Safely unguessable, moderate protection from offline slow-hash scenario
- **4 - Strong**: Very unguessable, strong protection from offline slow-hash scenario

## Security Features

- **Breach Detection**: Automatically checks passwords against the HaveIBeenPwned database
- **No Data Transmission**: Password analysis happens locally; only k-anonymity hashes are sent for breach checking
- **Real-time Feedback**: Provides actionable suggestions to improve password strength
- **Comprehensive Analysis**: Considers patterns, common passwords, keyboard layouts, and more

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build the library
npm run bundle

# Run linting
npm run lint
```

## License

MIT © [AdnanSilajdzic](https://github.com/AdnanSilajdzic)

## Acknowledgments

- Built with [zxcvbn-ts](https://github.com/zxcvbn-ts/zxcvbn) for password strength estimation
- Uses [HaveIBeenPwned API](https://haveibeenpwned.com/API/v3) for breach detection
- Inspired by modern security best practices
