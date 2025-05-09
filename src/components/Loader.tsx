// Loader.tsx
import React from 'react';

const Loader: React.FC = () => (
  <div style={styles.overlay}>
    <div style={styles.content}>
      {/* Logo Image */}
      <img
        src="https://raw.githubusercontent.com/7054company/xen/refs/heads/master/img/logo.png"
        alt="Logo"
        style={styles.logoImage}
      />

      {/* Loading Message */}
      <div style={styles.loadingText}>Loading your experience...</div>

      {/* Enhanced Spinner (disabled animation temporarily) 
      <div style={styles.spinner}></div> */}
    </div>
  </div>
);

const styles = {
  overlay: {
    position: 'fixed' as 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center', // Centers content vertically
    backgroundColor: '#ffffff',
  },
  content: {
    display: 'flex', // Changed from inline-flex to flex
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'center', // Centers content vertically in the container
    gap: '0.5rem', // Reduced gap between logo and loading text
  },
  logoImage: {
    width: '150px', // Adjust width if necessary
    height: 'auto',
    animation: 'glow 1.5s ease-in-out infinite alternate',
  },
  loadingText: {
    fontSize: '1.25rem',
    color: '#666666',
    animation: 'pulse 2s ease-in-out infinite',
    textAlign: 'center' as 'center', // Ensures text is centered relative to the content
  },
  spinner: {
    height: '3rem',
    width: '3rem',
    border: '0.4rem solid rgba(224, 224, 224, 0.6)',
    borderTopColor: 'transparent',
    borderRadius: '50%',
    backgroundImage: 'linear-gradient(45deg, #3b82f6, #a855f7, #14b8a6)',
    backgroundSize: '200% 200%',
    // Temporarily disabling spinner animation
    // animation: 'spin 1s linear infinite, gradientShift 3s ease-in-out infinite',
    marginTop: '1rem',
    boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)',
  },
};

// Define keyframes for animations
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes glow {
    0% { text-shadow: 0 0 15px rgba(59, 130, 246, 0.6); }
    100% { text-shadow: 0 0 30px rgba(59, 130, 246, 1); }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;
document.head.appendChild(styleSheet);

export default Loader;
