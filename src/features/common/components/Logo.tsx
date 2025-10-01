type ImageLogoProps = React.ImgHTMLAttributes<HTMLImageElement> & {
    text?: string;
    textClassName?: string;
}



export function ImageLogo({
    src,
    alt = 'Logo',
    text,
    textClassName = 'text-gray-900 font-bold ml-2',
    className,
    ...props
} : ImageLogoProps) {
    return (
        <div className={`inline-flex items-center ${className || ''}`}>
            <img src={src} alt={alt} {...props} />
            { text && <span className={textClassName}> { text } </span>}
        </div>
    )
}