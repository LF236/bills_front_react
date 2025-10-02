export function PublicLayout({
    children,
    ...props
} : React.PropsWithChildren) {
    return(
        <div>
            { children }
        </div>
    );
}