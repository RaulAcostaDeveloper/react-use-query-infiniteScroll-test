// solo los datos necesarios
type pictureOptions = {
    large: string,
    medium: string,
    thumbnail: string,
}
export interface UserType {
    picture: pictureOptions,
    name: string,
}