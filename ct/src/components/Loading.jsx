import { Triangle } from "react-loader-spinner"

const Loading = ()=>{
    return <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Triangle
            height="200"
            width="200"
            color="#24285B"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
        </>
}
export default Loading;