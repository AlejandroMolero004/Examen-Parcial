import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";

type data_ninja={
    pais:string
    capital:string
    latitude:number
    longitude:number
}
export const handler:Handlers={
    GET:async(_req:Request,ctx:FreshContext<unknown,data_ninja>)=>{
        const capital=ctx.params.la_ciudad
        const key=Deno.env.get("API_KEY")
        if(!key){
            return ctx.render()
        }
        const url_ninja=`https://api.api-ninjas.com/v1/country?name=${capital}`
        const response=await fetch(url_ninja,
        {
            headers: {
            'X-Api-Key': key
            },
        },
        )
        const respuesta=await response.json()
        const pais=respuesta[0].name

        const url=`https://api.api-ninjas.com/v1/geocoding?city=${capital}&country=${pais}`
        const response_loc=await fetch(url,
        {
            headers: {
            'X-Api-Key': key
            },
        },
        )
        const response_alt_lat=await response_loc.json()
        

        
       

        return ctx.render({pais:pais,capital:capital,latitude:response_alt_lat[0].latitude,longitude:response_alt_lat[0].longitude})
    }
}
const Page=(props:PageProps<data_ninja>)=>{
    
    return (
        <div>
            <a href={`/country/${props.data.pais}`}><p>{props.data.pais}</p></a>
            
            <p>{props.data.capital}</p>
            <p>{props.data.latitude}</p>
            <p>{props.data.longitude}</p>
            
        </div>
            
    )
}

export default Page