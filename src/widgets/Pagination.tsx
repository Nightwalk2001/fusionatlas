import {PAGE_SIZE} from "@/libs"
import {range}     from "d3-array"
import {useState}  from "react"

type Props = {
  total?: number
  maxCount?: number
  maxSideCount?: number
  onPage: (page: number) => void
}

type PageListProps = {
  start?: number
  end?: number
}

export const Pagination = ({
                             total = 140,
                             maxCount = 9,
                             maxSideCount = 6,
                             onPage
                           }: Props) => {
  const [current, setCurrent] = useState<number>(1)
  const totalPage = Math.ceil(total / PAGE_SIZE)

  const numberList  = range(totalPage).map(i => i + 1),
        excess      = totalPage - maxCount,
        breakpoint1 = maxSideCount,
        breakpoint2 = totalPage - maxSideCount,
        middleCount = Math.ceil(totalPage / 3)

  const onChange = (page: number) => {
          if (page !== current) {
            setCurrent(page)
            onPage(page)
          }
        },
        onPrev   = () => onChange(current - 1),
        onNext   = () => onChange(current + 1)

  const buttonStyle  = `px-3 py-1.25 text-gray-700 bg-gray-100 rounded-md cursor-pointer
                        transition-colors duration-150  hover:text-white hover:bg-cyan-400
                        hover:opacity-50 hover:ring-1 hover:ring-indigo-300`,
        activeStyle  = "text-white bg-cyan-400 hover:opacity-100 hover:ring-0",
        controlStyle = `px-3 py-1.25 bg-gray-100 rounded-md select-none transition-colors
                        duration-150 disabled:opacity-40 disabled:cursor-not-allowed`

  const PageList = ({start = 0, end = totalPage}: PageListProps) => <>
    {numberList
      .slice(start, end)
      .map(d => <li
        key={d}
        className={`${buttonStyle} ${d === current && activeStyle} `}
        onClick={() => onChange(d)}>{d}</li>)}
  </>

  return <div className={"flex items-center space-x-4 w-fit mx-auto"}>
    <button
      disabled={current === 1}
      className={controlStyle}
      onClick={onPrev}>
      上一页
    </button>
    <ul className={"flex space-x-3 my-2"}>
      {
        excess > 0
          ? current < breakpoint1
            ? <>
              <PageList end={maxSideCount}/>
              <li>...</li>
              <PageList start={excess + maxSideCount}/>
            </>
            : current <= breakpoint2
              ? <>
                <PageList end={Math.ceil((maxCount - middleCount) / 2)}/>
                <li>...</li>
                <PageList start={breakpoint2 - middleCount} end={breakpoint2}/>
                <li>...</li>
                <PageList start={totalPage - (maxCount - middleCount) / 2}/>
              </>
              : <>
                <PageList end={maxCount - maxSideCount}/>
                <li>...</li>
                <PageList start={totalPage - maxSideCount}/>
              </>
          : <PageList/>
      }
    </ul>
    <button
      disabled={current === totalPage}
      className={controlStyle}
      onClick={onNext}>
      下一页
    </button>

    <div>总计：{total}条</div>
  </div>
}
