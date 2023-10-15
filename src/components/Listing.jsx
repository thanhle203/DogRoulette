/* eslint-disable react/prop-types */
const Banned = (props) => {
    return (
        <>
            <div>
                {props.map((item) => {
                    <button className='ban' >{item}</button>
                })}
                
            </div>
        </>
    )
}

export default Banned;