import React from 'react'
import ProfilePage from '@/components/ProfilePage';
import baseUrl from '../../baseUrl.json'
export const getStaticPaths = async () => {
    const res = await fetch(`${baseUrl.url}/api/educators/getEducators`);
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
    const res1 = await fetch(`${baseUrl.url}/api/educators/getEducators/${id}`);
    const res2 = await fetch(`${baseUrl.url}/api/meetings/getMeetings/${educatorId}`);
    const res3 = await fetch(`${baseUrl.url}/api/meetings/getMaterials/${educatorId}`);
    const educators = await res1.json();
    const meetings = await res2.json();
    const materials = await res3.json();
    
    return {
      props: {
        educators,
        meetings,
        materials,
      },
    };
  };
  
  const myData = ({ educators,meetings,materials } : any) => {
    return (
      <>
        <ProfilePage data={educators}  meetings={meetings}  materials={materials}/>
      </>
    );
  };
  
  export default myData;
  
