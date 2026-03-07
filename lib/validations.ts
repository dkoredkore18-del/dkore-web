export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[0-9]{10}$/
  const cleaned = phone.replace(/\D/g, "")
  return phoneRegex.test(cleaned)
}

export function validateRequired(value: string): boolean {
  return value.trim().length > 0
}

export function validateMinLength(value: string, minLength: number): boolean {
  return value.trim().length >= minLength
}

export function validateMaxLength(value: string, maxLength: number): boolean {
  return value.trim().length <= maxLength
}

export interface ContactFormData {
  nombre: string
  email: string
  celular: string
  ciudad: string
  mensaje: string
}

export interface ContactFormErrors {
  nombre?: string
  email?: string
  celular?: string
  ciudad?: string
  mensaje?: string
}

export function validateContactForm(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {}

  if (!validateRequired(data.nombre)) {
    errors.nombre = "El nombre es requerido"
  } else if (!validateMinLength(data.nombre, 3)) {
    errors.nombre = "El nombre debe tener al menos 3 caracteres"
  }

  if (!validateRequired(data.email)) {
    errors.email = "El email es requerido"
  } else if (!validateEmail(data.email)) {
    errors.email = "El email no es válido"
  }

  if (!validateRequired(data.celular)) {
    errors.celular = "El celular es requerido"
  } else if (!validatePhone(data.celular)) {
    errors.celular = "El celular debe tener 10 dígitos"
  }

  if (!validateRequired(data.ciudad)) {
    errors.ciudad = "La ciudad es requerida"
  }

  if (!validateRequired(data.mensaje)) {
    errors.mensaje = "El mensaje es requerido"
  } else if (!validateMinLength(data.mensaje, 10)) {
    errors.mensaje = "El mensaje debe tener al menos 10 caracteres"
  }

  return errors
}
