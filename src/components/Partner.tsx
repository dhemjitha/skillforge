import Image from "next/image"

const companies = [
    {
        name: "STEMLink",
        logo: "https://stemlink.online/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffull-light-color.fcaee480.png&w=3840&q=75"
    },
    {
        name: "Microsoft",
        logo: "https://uhf.microsoft.com/images/microsoft/RE1Mu3b.png"
    },
    {
        name: "Google",
        logo: "https://www.gstatic.com/marketing-cms/assets/images/c5/3a/200414104c669203c62270f7884f/google-wordmarks-2x.webp=n-w300-h96-fcrop64=1,00000000ffffffff-rw"
    },


]

function Partner() {
    return (
        <div className="py-14 max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mx-auto px-4 md:px-8">
                <h2 className="text-center text-sm font-medium font-heading text-neutral-400 uppercase">
                    Trusted by the best in the industry
                </h2>
                <div className="mt-8">
                    <ul className="flex flex-wrap items-center gap-x-6 gap-y-6 md:gap-x-16 justify-center">
                        {companies.map((company) => (
                            <li key={company.name}>
                                <Image
                                    src={company.logo}
                                    alt={company.name}
                                    width={80}
                                    height={80}
                                    quality={100}
                                    className="w-28 h-auto"
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Partner