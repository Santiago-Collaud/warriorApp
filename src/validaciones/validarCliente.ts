import { Cliente } from "../interface/usuario"; // Ajusta el import según dónde tengas tus interfaces

export function validateClienteData(cliente: Cliente): string[] {
  const errores: string[] = [];

  // Nombre
  if (!cliente.nombre || cliente.nombre.trim().length < 2) {
    errores.push("El nombre es obligatorio y debe tener al menos 2 caracteres.");
  }

  // Apellido
  if (!cliente.apellido || cliente.apellido.trim().length < 2) {
    errores.push("El apellido es obligatorio y debe tener al menos 2 caracteres.");
  }

  // Mail
  if (!cliente.mail || !/^\S+@\S+\.\S+$/.test(cliente.mail)) {
    errores.push("Debe ingresar un correo electrónico válido.");
  }

  // Celular
  if (!cliente.celular || cliente.celular.trim().length < 8) {
    errores.push("El número de celular es obligatorio y debe tener al menos 8 dígitos.");
  }

  // Fecha de nacimiento
  if (!cliente.fecha_nacimiento || isNaN(Date.parse(cliente.fecha_nacimiento))) {
    errores.push("Debe ingresar una fecha de nacimiento válida.");
  } else {
    const fechaNacimiento = new Date(cliente.fecha_nacimiento);
    const hoy = new Date();
    if (fechaNacimiento > hoy) {
      errores.push("La fecha de nacimiento no puede ser futura.");
    }
  }

  // Grupo sanguíneo (opcional pero si existe debe ser válido)
  if (cliente.grupo_sanguineo && !["A", "B", "AB", "0"].includes(cliente.grupo_sanguineo.grupo)) {
    errores.push("Grupo sanguíneo inválido. Debe ser A, B, AB o 0.");
  }

  // Factor sanguíneo (opcional pero si existe debe ser válido)
  if (cliente.factor_sanguineo && !["+", "-"].includes(cliente.factor_sanguineo.factor)) {
    errores.push("Factor sanguíneo inválido. Debe ser + o -.");
  }

  return errores;
}
