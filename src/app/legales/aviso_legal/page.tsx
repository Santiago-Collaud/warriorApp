"use client";
export default function AvisoLegal() {
    return (
    <div>
        <h1 className="text-2xl mb-2 font-bold">🛡️ Aviso Legal – WarriorApp</h1>
            <p className="mb-4">
                Titular de la aplicación: <strong>Facundo Bialle</strong>
                <br />
                Email de contacto: <strong>warriorgymhasenkamp@gmail.com</strong>
                <br />
                Domicilio: <strong>Hasenkamp, Entre Ríos, Argentina.</strong>
            </p>
        <div>
            <h1 className="text-lg font-bold">1. Finalidad de la aplicación</h1>
            <p className="mb-4">
                WarriorApp es una aplicación progresiva (PWA) destinada a los usuarios del gimnasio Warrior Gym, 
                cuya función principal es brindar acceso a rutinas personalizadas, visualizar pagos, 
                enviar mensajes al administrador y acceder a información general del gimnasio.
            </p>
        </div>

        <div>
            <h1 className="text-lg font-bold">2. Titularidad de los datos</h1>
            <p className="mb-4">
                Los datos personales mostrados en la app (nombre, apellido, teléfono, email, grupo sanguíneo, factor y observaciones de salud) 
                provienen del sistema de gestión del gimnasio y fueron proporcionados voluntariamente por el titular o su representante 
                al momento de la inscripción. Dichos datos pueden ser actualizados desde la app por el propio usuario.
            </p>
        </div>

        <div>
            <h1 className="text-lg font-bold">3. Protección de Datos Personales</h1>
            <p className="mb-4">
                En cumplimiento de la Ley N.º 25.326 de Protección de Datos Personales, se informa que:
                <br />
                ○ Los datos recolectados tienen fines exclusivamente informativos y de gestión interna del gimnasio.
                <br />
                ○ El titular puede solicitar la modificación, actualización o eliminación de sus datos enviando un 
                correo a warriorgymhasenkamp@gmail.com.
                <br />
                ○ No se realiza cesión de datos a terceros, salvo obligación legal.
                <br />
                ○ Se han implementado medidas razonables de seguridad para la protección de los datos personales.
            </p>
        </div>

        <div>
            <h1 className="text-lg font-bold">4. Responsabilidad sobre el contenido</h1>
            <p className="mb-4">
                El contenido de las rutinas, mensajes y notificaciones es generado por el equipo del gimnasio. 
                WarriorApp no se responsabiliza por el uso indebido de la información ni por eventuales consecuencias derivadas 
                de interpretaciones erróneas.
            </p>
            
        </div>

        <div>
            <h1 className="text-lg font-bold">5. Condiciones de uso</h1>
            <p className="mb-4">
                El uso de esta app implica la aceptación de los presentes términos.  
                El acceso a la app requiere la creación previa de un perfil por parte del administrador del sistema.
                El usuario se compromete a hacer un uso responsable de la aplicación.
            </p>
        </div>
        <div>
            <h1 className="text-lg font-bold">6. Actualizaciones</h1>
            <p className="mb-4">
                WarriorApp se reserva el derecho de modificar este aviso legal sin previo aviso. 
                Se recomienda revisar periódicamente esta sección.
            </p>
            
        </div>
        
    </div>
   
    )
}