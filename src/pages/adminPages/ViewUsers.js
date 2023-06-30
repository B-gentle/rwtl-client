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
      } else {
        const message =
          (response.data && response.data.message) || (response.response && response.response.data && response.response.data.message) ||
          response.message ||
          response.toString();
        throw new Error(message)
      }

    } catch (error) {
      dispatch(SET_ERROR());
      message.error(error.message)
    }

  }

  const deleteUser = async () => {
    try {
      dispatch(SET_LOADING())
      const response = await DeleteUser({ userId: details._id })
      if (response.status === 200) {
        dispatch(SET_SUCCESS())
        message.success('User Deleted Successfully')
      } else {
        const message =
          (response.data && response.data.message) || (response.response && response.response.data && response.response.data.message) ||
          response.message ||
          response.toString();
        throw new Error(message)
      }
    } catch (error) {
      dispatch(SET_ERROR())
      message.error(error.message)
    }

  }

  const viewDownlineUser = async (username) => {
    try {
      const response = await ViewUser({ username })
      console.log(response)
      if (response.status === 200) {
        setDetails(response.data.data)
      } else {
        const message =
          (response.data && response.data.message) || (response.response && response.response.data && response.response.data.message) ||
          response.message ||
          response.toString();
        throw new Error(message)
      }

    } catch (error) {
      dispatch(SET_ERROR());
      message.error(error.message)
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
          <div className='mt-[1rem]'>
            <p className='font-[500] text-[1.2rem] bg-[#F7EF8A] p-[1rem] text-[#3a3a3a99]'>Personal Information</p>
            <div className='flex justify-between mt-[1.5rem]'>
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
            <p className='font-[500] text-[1.2rem] bg-[#F7EF8A] p-[1rem] text-[#3a3a3a99]'>Downlines</p>
            <div>
              <div className='flex flex-col md:flex-row md:gap-[1rem] md:flex-wrap'>
                {details.downlines.map((_, id) =>
                  <div key={id}>
                    <div className='mt-[10px] bg-[#D2AC47] p-[1rem] rounded-[4px] text-white'>
                      <div className='text-[1.5rem] font-[600]'>Level {id + 1}</div>
                      <div>
                        {details.downlines
                          .filter((downline) => downline.level === id + 1)
                          .map((downline, id) =>
                          (<div onClick={() => {viewDownlineUser(downline.username) }} key={id} className='flex flex-col mb-[1.5rem]'>
                            <span>Username: {downline.username}</span>
                            <span>Package: {downline.package.name}</span>
                            <span>PV: {downline.pv}PV</span>
                            <span>Level: {downline.level}</span>
                          </div>))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>}

    </div>
  )
}

export default ViewUsers