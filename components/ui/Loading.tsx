export default function Loading() {
  return (
    <div 
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh'
      }}
    >
      <div 
        style={{
          position: 'relative',
          width: '64px',
          height: '64px'
        }}
      >
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            border: '4px solid #2a2a2a',
            borderRadius: '50%'
          }}
        />
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            border: '4px solid transparent',
            borderTopColor: '#2a2a2a',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}
        />
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  )
}
