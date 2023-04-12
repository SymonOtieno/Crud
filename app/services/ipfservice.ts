import axios from "axios"
import Env from '@ioc:Adonis/Core/Env'

const ipfSummary = async(data)=>{

    const config = {
        method: 'post',
        url: Env.get('IPF_REPAYMENT_SCHEDULE'),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        data: JSON.stringify(data),
      }
      try {
        const response = await axios(config)
        return response.data
      } catch (error) {
        console.log(error)
        if (error.response.data) {
          return error.response.data
        }
        console.log('an error occured. Please check logs')
      }
    

}



module.exports={ipfSummary}