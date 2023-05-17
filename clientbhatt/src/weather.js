const apiKey = '04296c19ca2a34a3d4334e46237dedc6'

const iconUrlGenerator = (iconId) => `https://openweathermap.org/img/wn/${iconId}@2x.png`
let error=false ;
const getApiData = async (city, units = 'metric') => {
  
    const  placedata={city,apiKey,units};

    const data = await fetch('http://localhost:5000/temp'
    ,
    {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(placedata),
        method: "POST",
      }
    ).then((res) => res.json()).then((data) => data) 

 if(error){
    return [];
 }

        if(data.data['cod']==='404')
        {       console.log("eEROOR") ;
            return [];}


    const { weather, main: { temp, feel_like, temp_min, temp_max, pressure, humidty }, wind: { speed }, sys: { country }, name, } = data.data;

    const { description, icon } = weather[0];

    return {
        description,
        iconURL: iconUrlGenerator(icon),
        temp,
        feel_like, 
        temp_min,
        temp_max,
        pressure,
        humidty,
        speed,
        country,
        name,
    };
};

export { getApiData };

