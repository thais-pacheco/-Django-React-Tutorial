import {React} from 'react'
import {Box, Button, Typography} from '@mui/material'
import MyDatePickerField from './forms/MyDatePickerField'
import MyTextField from './forms/MyTextField'
import MySelectField from './forms/MySelectField'
import MyMultilineField from './forms/MyMultilineField'
import {useForm} from 'react-hook-form'
import AxiosInstance from './Axios'
import Dayjs  from 'dayjs'
import {useNavigate} from 'react-router-dom'

const Create = () => {

    const navigate = useNavigate()
    const defaultValues = {
        name : '',
        comments: '',
        status: '',
        start_date: '',
        end_date: '',
    }
    const {handleSubmit, reset, setValue, control} = useForm({defaultValues: defaultValues})
    const submission = (data) => {
        const StartDate = Dayjs(data.start_date["%d"]).format("YYYY-MM-DD")
        const EndDate = Dayjs(data.end_date["%d"]).format("YYYY-MM-DD")


        AxiosInstance.post(
            `project/`,{
                name: data.name,
                status: data.status,
                comments: data.comments,
                start_date: StartDate,
                end_date: EndDate,
            }
        )
        .then((res) =>{
            navigate(`/`)
        })

    }
    return (
        <div>
            <form onSubmit={handleSubmit(submission)}>
                <Box sx={{display:'flex', width:'100%', backgroundColor:'#00003f', marginBottom:'10px'}}>
                <Typography sx={{marginLeft:'20px', color:'#fff'}}>
                    Create records
                </Typography>
                </Box>

            <Box sx={{display:'flex', width:'100%', boxShadow:3, padding:4, flexDirection:'column'}}>

            <Box sx={{display:'flex', justifyContent:'space-around', marginBottom:'40px'}}>
                <MyTextField
                        label="Name"
                        name="name"
                        control={control}
                        placeholder="provide a project name"
                        width={'30%'}
                    />
                    <MyDatePickerField
                    label="Start date"
                    name="start_date"
                    control={control}
                    width={'30%'}
                    />
                    <MyDatePickerField
                    label="End date"
                    name="end_date"
                    control={control}
                    width={'30%'}
                    />
                </Box>

                <Box sx={{display:'flex', justifyContent:'space-around'}}>
                    <MyMultilineField
                        label="Comments"
                        name="comments"
                        control={control}
                        placeholder="provide project comments"
                        width={'30%'}
                    />
                    <MySelectField
                    label="Status"
                    name="status"
                    control={control}
                    width={'30%'}
                    />
                    <Box sx={{width:'30%'}}>
                    <Button variant="contained" type="submit" sx={{width:'100%'}}>
                        Submit
                    </Button>
                    </Box>
                </Box>

            </Box>
            </form>
        </div>
    )
}

export default Create