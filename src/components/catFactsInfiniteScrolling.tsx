import { useCallback, useEffect, useRef, useState } from "react"
import { useQuery } from "@tanstack/react-query";
import { getDataByPage } from "../apiCalls/getDataByPage";
import { factWithUser } from "../types/catFatcsTypes.model";
import { IsLoadingComponent } from "./isLoadingComponent";
import { ItemList } from "./itemList";
import { ErrorComponent } from "./errorComponent";
export const CatFactsInfiniteScrolling = (): JSX.Element => {

    // Cambia dependiendo la cantidad de veces que sea necesaria llamara a la API
    // Controla las peticiones a las API (ambas)
    const [nRequest, setNRequest] = useState(1);
    
    // Data lista a ser renderizada
    const [renderingData, setRenderingData] = useState<factWithUser[][]>([]);
    
    // referencia para obtener la altura del elemento actuál
    const catFactsInfiniteScrollingRef = useRef(null);

    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ['fetchDataCatFacts', nRequest],
        queryFn: () => getDataByPage(nRequest),
    });


    useEffect((): void => {
        if (data) {
            // Construcción de un arreglo con las respuestas de ambas peticiones.
            const factsArr: factWithUser[] = [];
            for (let index = 0; index < 10; index++) {
                factsArr.push({
                    fact: data.catFacts[index],
                    user: data.users[index],
                })
            }
            // Se suma al arreglo de arreglo de datos
            setRenderingData(prevItems => [...prevItems, factsArr]);
        }
    }, [data]);

    useEffect((): void => {
        // Al cargar nuevos datos, detecta si la pantalla está "llena"
        // Si no está llena, hace otra petición
        if (catFactsInfiniteScrollingRef.current && !isLoading) {
            const { clientHeight } = catFactsInfiniteScrollingRef.current;
            const pageHeight = window.innerHeight;
            if (clientHeight < pageHeight) {
                setNRequest(nRequest + 1);
            }
        }
    }, [renderingData])

    const handleScroll = useCallback((): void => { // Actualiza su definición en base a sus dependencias
        // Detecta el scroll y si no hay un error en puerta
        // ni está aún cargando datos
        // Entonces hace otra petición al servidor
        if (error === null) {
            if (window.innerHeight + document.documentElement.scrollTop >=
                document.documentElement.offsetHeight - 100 && !isLoading) {
                setNRequest(nRequest + 1);
            }
        }
    }, [error, isLoading]);

    // Detecta el scroll del usuario y ejecuta un callback
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isLoading, handleScroll]);

    return (
        <div ref={catFactsInfiniteScrollingRef} className="bg-slate-200 pt-4">
            <div className="w-full flex justify-center">
                <p className="w-4/5 mt-10 mb-10">This infinite scrolling application uses <b>React-query</b> to fetch data, <b>Tailwind css</b> for styling and <b>TypeScript</b> to type data.</p>
            </div>
            {renderingData.map((page, index) => (
                <div key={index} className="">
                    {page.map((item, indexItem) => (
                        <ItemList item={item} indexItem={indexItem}/>
                    ))}
                </div>
            ))}
            {isLoading && <IsLoadingComponent/>}
            {/* Gracefully handle errors from the API */}
            {error && <ErrorComponent errorMessage={error.message}/> }
            {error && <button onClick={() => refetch()}>Try again</button>}
        </div>
    )
}