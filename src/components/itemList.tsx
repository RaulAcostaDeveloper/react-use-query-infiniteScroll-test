import { factWithUser } from "../types/catFatcsTypes.model"
type Props = {
    indexItem: number,
    item: factWithUser
}
export const ItemList = ({indexItem, item}: Props): JSX.Element => {
    return (
        <div key={indexItem} className="w-full flex justify-center flex-wrap">
            <div className="p-4 w-72 md:w-4/5 border bg-white m-1 rounded-lg shadow">
                <div className="flex items-center">
                    <img className="rounded-full" src={item.user.picture.thumbnail} alt="User image" />
                    <span className="font-semibold ml-2">{item.user.name}</span>
                </div>
                <div className="mt-2">
                    <span>{item.fact}</span>
                </div>
            </div>
        </div>
    )
}