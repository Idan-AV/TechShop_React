import { Button } from "@mui/material"


const ProfilePageView = ({setIsEdit})=>{

    return(
        <>
        <p>ProfilePageView</p>
        <Button onClick={()=>{setIsEdit(true)}}>edit mode</Button>
        </>
    )
}

export default ProfilePageView