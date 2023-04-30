import Link from "next/link";
import baseUrl from '../../baseUrl.json'
import EducatorCard from "@/components/EducatorCard";
export const getServerSideProps = async () => {
  const res = await fetch(`${baseUrl.url}/api/educators/getEducators`);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};

const educators = ({ data } : any) => {
  return (
    <>
          
            <section className="py-14">
            <div className="max-w-screen-xl mx-auto px-4 text-center md:px-8 text-white">
                <div className="max-w-xl mx-auto">
                    <h3 className=" text-3xl font-semibold sm:text-4xl">
                        Meet our Educators
                    </h3>
                    <p className=" mt-3">
                    Meet the Amazing Educators Who Will Guide Your Path to Learning
                    </p> 
                </div>
                <div className="mt-12">
                    <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
                        {
                            data.map((item : any) => (
                                <Link key={item._id} href={`/Educators/${item._id ? item._id.toString() : ''}`}>
                                 <EducatorCard props={item} />
                              </Link>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </section>
       
    </>
  );
};

export default educators;