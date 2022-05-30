import React from 'react'

const InputField = (props) => {
    return (
        <>
            <div className='form-row mb-2'>
                <label htmlFor={props.id}>{props.labelname}</label>
                <input className='form-control' type={props.type} name={props.name} id={props.id} disabled={props.disabledval} value={props.value} onChange={props.changeval} placeholder={props.placeholder} required />
                <span className='text-danger'>{props.error}</span>
            </div>
        </>
    )
}

const TextArea = (props) => {
    return (
        <>

            <div className='form-row mb-2'>
                <label htmlFor={props.id}>{props.labelname}</label>
                <textarea className='form-control' placeholder={props.placeholder} name={props.name} id={props.id} value={props.value} onChange={props.changeval} rows={props.row} required >{props.desc}</textarea>
                <span className='text-danger'>{props.error}</span>
            </div>
        </>
    )
}


const ImageBanner = (props) => {
    return (
        <>
            <div className="form-row">
                <div className="form-group">
                    <label>{props.labelname}</label>


                    <div className="input-group mb-3">

                        <div className="custom-file">
                            <input type="file" className="form-control" accept="image/*" id={props.id}
                                name={props.name} onChange={props.changeval} />
                        </div>
                    </div>
                    <span className='text-danger'>{props.error}</span>

                </div>
            </div>
        </>
    )
}


const SelectTabs = (props) => {
    return (
        <>
            <div className='form-row mb-2'>
                <label htmlFor={props.id}>{props.labelname}</label>
                <select className="form-select" id={props.id} aria-label={props.id} >
                    {props.option.map((item, index) => {
                        return <option key={index} value={item}>{item}</option>
                    })}
                </select>
                <span className='text-danger'>{props.error}</span>
            </div>

        </>
    );
}

const Checkbox = (props) => {
    return (
        <>
            <div className="form-check mb-2">
                <input className="form-check-input" type="checkbox" id={props.id} onChange={props.checkornotval} checked={props.checksornot} />
                <label className="form-check-label" htmlFor={props.id}>
                    {props.labelname}
                </label>
            </div>
        </>
    )
}


const NewInput = (props) => {
    return (
        <div className="form-group row">
            <label htmlFor={props.id} className="col-sm-2 col-form-label">{props.labelname}</label>
            <div className="col-sm-10">
                <input type={props.type} className="form-control" id={props.id} name={props.name} placeholder={props.placeholder} disabled={props.disabledval} value={props.value} onChange={props.changeval} accept={props.accept} />
                <span className='text-danger'>{props.err}</span>
            </div>
        </div>
    );
}

export { TextArea, ImageBanner, SelectTabs, Checkbox, NewInput };
export default InputField;