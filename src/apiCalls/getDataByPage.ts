import { UserType } from "../types/usersTypes.model";
import { getDatafrom } from "./apiGetters";

export const getDataByPage = async (nRequesst: number) => {  
    // En base a las necesidades del scroll, solicita más datos
    // Usando como parámetro el número del request controlado en el componente
    const catResponse = await getDatafrom(`https://catfact.ninja/facts?page=${nRequesst}`);
    const catFacts: string[] = [];
   
    // catResponse.data.length es la cantidad de "facts" que obtenemos por respuesta
    // así que lo usamos para obtener una cantidad de usuarios determinada
    for (let index = 0; index < catResponse.data.length; index++) {
        catFacts.push(catResponse.data[index].fact)
    }

    // Sólo extrae los datos necesarios de las respuestas
    const users: UserType[] = [];
    for (let index = 1; index <= nRequesst * catResponse.data.length; index++) {
        const response = await getDatafrom(`https://randomuser.me/api?page=${index}`);        
        users.push({
            picture: response.results[0].picture,
            name: response.results[0].name.first + ' ' +  response.results[0].name.last,
        });
    }
    return { catFacts, users };
}