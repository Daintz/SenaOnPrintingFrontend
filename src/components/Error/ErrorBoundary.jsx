import React, { Component } from 'react'

class ErrorBoundary extends Component {
  constructor (props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError (error) {
    // Actualiza el estado para que el siguiente renderizado muestre la interfaz de error
    return { hasError: true }
  }

  componentDidCatch (error, errorInfo) {
    // También puedes registrar el error en un servicio de reporte de errores
    console.error('Error capturado en ErrorBoundary:', error, errorInfo)
  }

  render () {
    if (this.state.hasError) {
      // Puedes personalizar el mensaje de error aquí
      return <h1>¡Algo salió mal!</h1>
    }

    return this.props.children
  }
}

export default ErrorBoundary
