import React from 'react'

const DateTime = ({date,options:{
    weekday,year,month ,day,hour,minute,second
}}) => {
    var currentlocale=new Intl.DateTimeFormat().resolvedOptions().locale;
    const getDate=()=>{ 
        new Intl.DateTimeFormat(currentlocale,{
            year,
            month,
            weekday,
            day,
            hour,
            minute,
            second,
        }).format(Date.parse(date))
    }
  return (

    <div>{getDate()}</div>
  )
}

DateTime.defaultProps={
    options:{
        weekday:'short',
        year:'numeric',
        month:'long',
        day:'numeric',
        hour:'numeric',
        minute:'numeric',
        second:'numeric',
    },
}
export default DateTime