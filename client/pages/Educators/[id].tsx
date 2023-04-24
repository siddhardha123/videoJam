import React from 'react'
import ProfilePage from '@/components/ProfilePage';
export const getStaticPaths = async () => {
    const res = await fetch("http://localhost:3001/api/educators/getEducators");
    const data = await res.json();
  
    const paths = data.map((item : any) => {
      return {
        params: {
          id : item._id.toString(),
        },
      };
    });
  
    return {
      paths,
      fallback: false,
    };
  };
  
  export const getStaticProps = async (context  : any) => {
    const id = context.params.id;
    const educatorId = context.params.id;
    const res1 = await fetch(`http://localhost:3001/api/educators/getEducators/${id}`);
    const res2 = await fetch(`http://localhost:3001/api/meetings/getMeetings/${educatorId}`);
    const educators = await res1.json();
    const meetings = await res2.json();
    return {
      props: {
        educators,
        meetings,
      },
    };
  };
  
  const myData = ({ educators,meetings } : any) => {
    return (
      <>
        <ProfilePage data={educators}  meetings={meetings}/>
      </>
    );
  };
  
  export default myData;
  
