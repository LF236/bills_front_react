export function PublicLayout({
    children,
    ...props
} : React.PropsWithChildren) {
    return(
        <>
            { children }
        </>
    );
}