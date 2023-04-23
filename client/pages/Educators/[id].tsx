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
    const res = await fetch(`http://localhost:3001/api/educators/getEducators/${id}`);
    const data = await res.json();
  
    return {
      props: {
        data,
      },
    };
  };
  
  const myData = ({ data } : any) => {
    return (
      <>
        <ProfilePage data={data}/>
      </>
    );
  };
  
  export default myData;
  
