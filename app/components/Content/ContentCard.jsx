import Image from "next/image"

const ContentCard = ({tweetContent, attachment}) => {
    return (
        <div
        className="flex flex-col p-10 px-15 text-2xl gap-10 rounded-2xl border-1 w-250"
        >
            <div className="tweetToolbar flex flex-row justify-between mx-5 items-baseline">
                <div className="userProfile flex flex-row justify-start gap-10">
                    <div>
                        <p className="font-bold">profile <span className="text-gray-400 font-normal">@username</span></p>
                    </div>
                    <div>
                        <button className="text-blue-400 font-bold">
                            Follow
                        </button>
                    </div>
                </div>

                <div className="flex flex-row gap-1 select-none">
                    <div>|</div>
                    <div>|</div>
                    <div>|</div>
                </div>
            </div>
            <hr />
            <div
            className="aboslute"
            >
                <p>{tweetContent}</p>
            </div>

            <div>
                {attachment ? attachment.map((a) => 
                    <Image src={a.url} width={500} height={500} />
                ) : null
                }
            </div>
            <hr />
            <div className="flex flex-row justify-between text-xl mx-20">
                <button>Like</button>
                <button>Comment</button>
                <button>Share</button>
            </div>
        </div>
    )
}

export default ContentCard