import clsx from "clsx"
import {Navigation} from "../features"
import styles from "../styles/home.module.css"

const Home = () => {
    return <div className={"relative pb-10"}>

        <div className="px-4 sm:px-6 md:px-8">
            <div
                className={clsx(
                    "absolute inset-0 bottom-10 bg-bottom bg-no-repeat bg-gray-50 dark:bg-[#0B1120]",
                    styles.beams
                )}
            >
                <div
                    className="absolute inset-0 bg-grid-gray-900/[0.04] bg-[bottom_1px_center] dark:bg-grid-gray-400/[0.05] dark:bg-bottom dark:border-b dark:border-gray-100/5"
                    style={{
                        maskImage: "linear-gradient(to bottom, transparent, black)",
                        WebkitMaskImage: "linear-gradient(to bottom, transparent, black)"
                    }}
                />
            </div>
        </div>

        <div className="relative pt-6 lg:pt-8 flex items-center justify-between text-gray-700 font-semibold text-sm leading-6 dark:text-gray-200">
            <Navigation/>
        </div>

        <div className="relative max-w-5xl mx-auto pt-20 text-center sm:pt-24 lg:pt-32">
            <h1 className="text-gray-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
                The Relation between Epitranscriptome and epigenome.
            </h1>
            <p className="mt-6 text-lg text-gray-600 text-center max-w-3xl mx-auto dark:text-gray-400">
                EpiCross tools provide effective tools and rich visual interfaces for studying the system
                .{" "}
                <code className="font-mono font-medium text-sky-500 dark:text-sky-400">regulation</code>,{" "}
                <code className="font-mono font-medium text-sky-500 dark:text-sky-400">between</code>,{" "}
                <code className="font-mono font-medium text-sky-500 dark:text-sky-400">
                    epigenome
                </code>{" "}
                and{" "}
                <code className="font-mono font-medium text-sky-500 dark:text-sky-400">epitranscriptome</code>{" "}
                that can be composed.
            </p>

            <div className={"flex flex-col items-center mb-10"}>
                <div className={"flex my-10"}>
                    <button
                        className={"mr-12 px-3.5 py-2.5 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-400"}>
                        quick start
                    </button>
                    <button
                        className={"px-3.5 py-2.5 text-gray-500 bg-white rounded-md shadow-md hover:bg-gray-50"}>
                        documentation
                    </button>
                </div>
            </div>

        </div>

    </div>
}

export default Home
