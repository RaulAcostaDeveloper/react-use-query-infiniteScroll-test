// Obtuve este comportamiento de https://uiverse.io/Javierrocadev/hard-horse-30
export const IsLoadingComponent = (): JSX.Element => {
    return (
        <div className="flex w-full justify-center pt-4 pb-4">
            <div className="flex flex-row gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
            </div>
            <span className="ml-4">Is loading...</span>
        </div>
    )
}