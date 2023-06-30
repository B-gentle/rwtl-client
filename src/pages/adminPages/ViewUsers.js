import { Button, Form, Input, message } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BackArrowHeading from '../../components/BackArrowHeading'
import { selectLoading, SET_ERROR, SET_LOADING, SET_SUCCESS } from '../../redux/features/processingStates/processStatesSlice'
import { DeleteUser, ViewUser } from '../../services/adminCalls'
import { BiEdit } from 'react-icons/bi';

const ViewUsers = () => {
  const [details, setDetails] = useState(null)
  const [editPI, setEditPI] = useState(false)
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const loading = useSelector(selectLoading)

  const onFinish = async ({ username }) => {
    dispatch(SET_LOADING())
    try {
      const response = await ViewUser({ username })
      if (response.status === 200) {
        dispatch(SET_SUCCESS())
        form.resetFields();
        setDetails(response.data.data)
      }

    } catch (error) {
      dispatch(SET_ERROR());
      console.log(error)
    }

  }

  const deleteUser = async() =>{
    const response = await DeleteUser({userId: details._id})
    if(response.status === 200){
      message.success('User Deleted Successfully')
    }
  }


  return (
    <div className='p-[1rem]'>
      <BackArrowHeading title="View User Details" link="admin" />
      {!details && <div>
        <Form className='flex flex-col items-center justify-center h-screen'
          onFinish={onFinish}
        >
          <Form.Item
            form={form}
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input placeholder='Type Username' />
          </Form.Item>

          <Form.Item
          >
            <Button type="primary" htmlType="submit" block loading={loading && true}>
              {loading ? 'Getting User' : 'Submit'}
            </Button>
          </Form.Item>
        </Form>
      </div>}
      {details && <div>
        <div>
          <div className='flex justify-between items-center'>
            <h2>User Details</h2>
            {/* <button>Block User</button> */}
            <button onClick={deleteUser} className='bg-[red] text-white border-none rounded-[4px] p-[5px]'>Delete User</button>
          </div>
          <div>
            <p>Personal Information</p>
            <div className='flex justify-between'>
              <div className='flex flex-col md:flex-row gap-[1rem] md:gap-[1rem] md:flex-wrap'>
                <div className='flex flex-col gap-[10px]'>
                  <label>Fullname:</label>
                  <input className={!editPI && `border-none outline-none bg-[transparent]`} type="text" defaultValue={details.fullname} disabled={editPI ? false : true} />
                </div>

                <div className='flex flex-col gap-[10px]'>
                  <label>Username:</label>
                  <input className={!editPI && `border-none outline-none bg-[transparent]`} type="text" defaultValue={details.username} disabled={editPI ? false : true} />
                </div>

                <div className='flex flex-col gap-[10px]'>
                  <label>Package:</label>
                  <input className={!editPI && `border-none outline-none bg-[transparent]`} type="text" defaultValue={details.package.name} disabled={editPI ? false : true} />
                </div>

                <div className='flex flex-col gap-[10px]'>
                  <label>Wallet Balance:</label>
                  <input className={!editPI && `border-none outline-none bg-[transparent]`} type="number" defaultValue={details.walletBalance} disabled={editPI ? false : true} />
                </div>

                <div className='flex flex-col gap-[10px]'>
                  <label>Withdrawable Commission:</label>
                  <input className={!editPI && `border-none outline-none bg-[transparent]`} type="number" defaultValue={details.withdrawableCommission} disabled={editPI ? false : true} />
                </div>

                <div className='flex flex-col gap-[10px]'>
                  <label>Total Commission:</label>
                  <input className={!editPI && `border-none outline-none`} type="number" defaultValue={details.commissionBalance} disabled={editPI ? false : true} />
                </div>

                <div className='flex flex-col gap-[10px]'>
                  <label>PV:</label>
                  <input className={!editPI && `border-none outline-none`} type="number" defaultValue={details.pv} disabled={editPI ? false : true} />
                </div>

              </div>
              <BiEdit size={23} onClick={() => { setEditPI(!editPI) }} />
            </div>
          </div>

          <div className='mt-[1rem]'>
            <p>Downlines</p>
            <div className='flex justify-between'>
              <div className='flex flex-col md:flex-row md:gap-[1rem] md:flex-wrap'>
                {details.downlines.map((downline, id) => 
                  <span>
                    {downline.username}
                    {downline.level}
                    {downline.package.name}
                  </span>
                )}
              </div>
              <BiEdit size={23} />
            </div>
          </div>
        </div>
        <div></div>
        <div></div>
      </div>}

    </div>
  )
}

export default ViewUsers