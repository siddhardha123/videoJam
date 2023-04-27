import Link from "next/link";
import EducatorCard from "@/components/EducatorCard";
export const getStaticProps = async () => {
  const res = await fetch("https://videojambackend.vercel.app/api/educators/getEducators");
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
                        Meet our team
                    </h3>
                    <p className=" mt-3">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industrys standard dummy.
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