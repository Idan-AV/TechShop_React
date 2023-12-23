import { Button } from "@mui/material"

const ProfilePageEdit =({setIsEdit})=>{
return(
    <>
    <p>ProfilePageEdit</p>
    <Button onClick={()=>{setIsEdit(false)}}>back to view mode</Button>
    </>
)
}



export default ProfilePageEdit