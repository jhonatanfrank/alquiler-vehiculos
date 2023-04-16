import React from 'react'

const Footer = () => {
    return (
        <div>
            <div className="footer container-fluid p-5 bg-dark text-white text-white text-center">
                <div className="row">
                    <div className="col-sm-4">
                        <h3 className='texto-footer'>Rent Car´s</h3>
                        <p className='texto-footer'>
                            Empresa líder en alquiler de vehículos, con más de 11 años en el
                            mercado. Ofrecemos una amplia flotilla de vehículos de alquiler
                            constantemente renovada con los últimos modelos, las últimas
                            tecnologías y con equipamiento premium así garantizando la seguridad
                            y comodidad en tu movilidad.
                        </p>
                    </div>
                    <div className="col-sm-4">
                        <h3 className='texto-footer'>Datos de Contacto</h3>
                        <p className='texto-footer'>
                            Av. Pacasmayo 4717 - Callao / Av. Nueva Toledo 239 C - Cieneguilla /
                            Lima - Perú 981 410 418 Reservas@luxuryrentacarperu.com
                        </p>
                    </div>
                    <div className="col-sm-4">
                        <h3 className='texto-footer'>Horario</h3>
                        <p className='texto-footer'>
                            Lunes – viernes: 08:00 am – 06:00 pm <br />
                            Sábado – Domingo: 08:00 am – 03:00 pm
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
