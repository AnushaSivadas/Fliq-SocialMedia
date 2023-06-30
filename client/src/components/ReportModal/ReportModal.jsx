import { Modal, useMantineTheme } from "@mantine/core";
import { reportData } from "../../utils/Constants.js";
import { useSelector } from "react-redux";
import { reportPost } from "../../api/PostsRequests.js";
import Swal from "sweetalert2";


function ReportModal({ reportModalOpened, setReportModalOpened,post }) {
  const { user } = useSelector((state) => state.authReducer.authData);
  const theme = useMantineTheme();
  const handleReportData = async (data)=>{
    const reportData={
      postId:post._id,
      userId:user._id,
      postUserId:post.userId,
      reason:data
    }
   const response = await reportPost(reportData)

   if(response.data === "Already Reported"){
          Swal.fire({
            icon: "error",
            title: "Already Reported",
            text: "You have already reported,neccesary action will be taken.",
          });
        setReportModalOpened(false)

    return
   }
   Swal.fire("Reported!", "The post has been reported.", "success");
   setReportModalOpened(false)
  
  }
  return (
    <Modal
      size={"20%"}
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={reportModalOpened}
      onClose={() => setReportModalOpened(false)}
      
    >
      <div>
        <div style={{textAlign:"center",fontWeight:"bold",color:"red"}}>Report</div>
        <b><hr/></b>
        <div style={{fontWeight:"bolder"}}>Why are you reporting this post?</div>       
       <hr/>
       
       { reportData.map((data,id)=>{
        return (
            <div className="reportOptions" key={id} onClick={()=>{              
              handleReportData(data);
            }}>
                <span>{data}</span>
                <hr/>
            </div>
        )
       })}
      </div>
    </Modal>
  );
}

export default ReportModal;
