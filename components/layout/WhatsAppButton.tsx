"use client"

import { useState } from "react"
import { FaWhatsapp } from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false)
  
  const whatsappNumber = "593999215891"
  const message = "Hola, estoy interesado en sus productos"
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div 
        style={{
          position: 'relative'
        }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              style={{
                position: 'absolute',
                right: '100%',
                marginRight: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'black',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '8px',
                whiteSpace: 'nowrap',
                fontSize: '14px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
              }}
            >
              ¿Necesitas ayuda? Chatea con nosotros
              <div 
                style={{
                  position: 'absolute',
                  right: '-8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 0,
                  height: 0,
                  borderTop: '8px solid transparent',
                  borderBottom: '8px solid transparent',
                  borderLeft: '8px solid black'
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '64px',
            height: '64px',
            backgroundColor: '#22c55e',
            borderRadius: '50%',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            transition: 'all 0.3s',
            cursor: 'pointer',
            textDecoration: 'none'
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{ 
            boxShadow: [
              "0 0 0 0 rgba(34, 197, 94, 0.4), 0 8px 24px rgba(0,0,0,0.3)",
              "0 0 0 20px rgba(34, 197, 94, 0), 0 8px 24px rgba(0,0,0,0.3)",
            ]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "loop"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#16a34a'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#22c55e'
          }}
        >
          <FaWhatsapp style={{ color: 'white', fontSize: '32px' }} />
        </motion.a>
      </div>
    </div>
  )
}
