type Props = {
    route: string
}

export default function RouteNumber ({route}: Props) {
   
    const routeNumbers = route.match(/\d+/)
    const routeLetters = route.match(/\D/)
    
    return (
        <>
            {routeNumbers}
            <span>{routeLetters}</span>
        </>

    )

}