/**
 * Componente `Button`
 *
 * Un botón reutilizable que puede renderizarse como un `<button>` nativo
 * o como un enlace `<a>`, dependiendo de si se le pasa la prop `href`.
 *
 * ---
 * ## Props
 *
 * - **variant**: `"solid"` | `"outline"`
 *    - Determina el estilo visual del botón.
 *    - `solid`: botón con fondo de color.
 *    - `outline`: botón con borde.
 *
 * - **color**: `"cyan"` | `"white"` | `"gray"`
 *    - Define el esquema de color del botón.
 *    - `cyan`: estilo principal (acciones destacadas).
 *    - `white`: estilo alternativo sobre fondos oscuros.
 *    - `gray`: estilo neutro para acciones secundarias.
 *
 * - **href**?: `string`
 *    - Si está presente, el componente se renderiza como `<a>`.
 *    - Si no está, se renderiza como `<button>`.
 *
 * - **type**: `"button"` | `"submit"` | `"reset"`
 *    - Solo aplica cuando el componente se renderiza como `<button>`.
 *    - Por defecto es `"button"`.
 *
 * - **className**?: `string`
 *    - Permite extender o sobrescribir las clases de estilo base.
 *
 * - **children**: `ReactNode`
 *    - Contenido del botón (texto, íconos, etc).
 *
 * ---
 * ## Uso
 *
 * ### Como botón normal
 * ```tsx
 * <Button type="button" variant="solid" color="cyan">
 *   Guardar
 * </Button>
 * ```
 *
 * ### Como enlace
 * ```tsx
 * <Button href="/dashboard" variant="outline" color="gray">
 *   Ir al Dashboard
 * </Button>
 * ```
 *
 * ---
 * ## Notas
 * - Internamente, el componente maneja la inferencia de tipos para que
 *   `<a>` y `<button>` no entren en conflicto (ej. `onClick`, `onCopy`).
 * - Si usas `href`, asegúrate de que sea una URL válida o ruta interna.
*/

import clsx from 'clsx'

const baseStyles = {
  solid:
    'inline-flex justify-center rounded-lg py-2 px-3 text-sm font-semibold transition-colors',
  outline:
    'inline-flex justify-center rounded-lg border py-[calc(--spacing(2)-1px)] px-[calc(--spacing(3)-1px)] text-sm transition-colors',
}

const variantStyles = {
  solid: {
    cyan: 'relative overflow-hidden bg-cyan-500 text-white before:absolute before:inset-0 active:before:bg-transparent hover:before:bg-white/10 active:bg-cyan-600 active:text-white/80 before:transition-colors',
    white:
      'bg-white text-cyan-900 hover:bg-white/90 active:bg-white/90 active:text-cyan-900/70',
    gray: 'bg-gray-800 text-white hover:bg-gray-900 active:bg-gray-800 active:text-white/80',
  },
  outline: {
    gray: 'border-gray-300 text-gray-700 hover:border-gray-400 active:bg-gray-100 active:text-gray-700/80',
  },
}

type ButtonBaseProps =
  | { variant?: 'solid'; color?: keyof typeof variantStyles.solid }
  | { variant: 'outline'; color?: keyof typeof variantStyles.outline }


	type AnchorButtonProps = ButtonBaseProps &
  Omit<React.ComponentPropsWithoutRef<'a'>, 'color'> & {
    href: string
  }

type NativeButtonProps = ButtonBaseProps &
  Omit<React.ComponentPropsWithoutRef<'button'>, 'color'> & {
    href?: undefined
  }

type ButtonProps = AnchorButtonProps | NativeButtonProps

export function Button({ className, ...props }: ButtonProps) {
  props.variant ??= 'solid'
  props.color ??= 'gray'

  className = clsx(
    baseStyles[props.variant],
    props.variant === 'outline'
      ? variantStyles.outline[props.color]
      : props.variant === 'solid'
        ? variantStyles.solid[props.color]
        : undefined,
    className,
  )

  if (props.href) {
    return <a className={className} {...props} />
  }

  return <button type="button" className={className} {...props} />
}
