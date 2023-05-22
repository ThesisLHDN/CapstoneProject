import React from 'react';
import {Avatar} from '@mui/material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

function MemberManagement({data}) {
  return (
    <div style={{border: '1px solid #787878', borderRadius: 16}}>
      <div className="flex">
        <p className="text-left text-tg-text-color font-bold text-base mt-6 mx-6">
          Member Performance
        </p>
        <SettingsOutlinedIcon sx={{marginTop: 3}} />
      </div>
      <p className="text-sm italic ml-6 mt-3">Short description</p>

      <div className="flex mt-8 mb-4 overflow-auto ml-6">
        {data.map((member) => {
          return (
            <div
              key={member.id}
              style={{
                border: '1px solid gray',
                borderRadius: 8,
                minWidth: 176,
                marginRight: 8,
                marginBottom: 8,
              }}
            >
              <div className="flex mt-3 ml-2">
                <Avatar
                  src="X"
                  sx={{
                    width: 32,
                    height: 32,
                    backgroundColor: '#8993A4',
                    marginRight: 1,
                    borderRadius: 1,
                  }}
                  alt={member.name}
                />
                <span className="flex text-sm mt-1.5">{member.name}</span>
              </div>

              <div className="flex mx-2 mt-2 justify-between">
                <div
                  style={{
                    minWidth: 74,
                    backgroundColor: '#EFEFEF',
                    borderRadius: 4,
                  }}
                >
                  <p className="text-sm font-bold ml-2 pt-1">
                    {member.overdue}
                  </p>
                  <p className="text-xs ml-2 pb-1">Due</p>
                </div>
                <div style={{minWidth: 74, backgroundColor: '#EFEFEF'}}>
                  <p className="text-sm font-bold ml-2 pt-1">
                    {member.doneInTime + member.doneInDue}
                  </p>
                  <p className="text-xs ml-2 pb-1">Done</p>
                </div>
              </div>

              <div className="flex justify-between ml-2 mr-3 mt-4">
                <div className="flex">
                  <FiberManualRecordIcon
                    sx={{
                      color: '#00980F',
                      width: 12,
                      height: 12,
                      marginTop: 0.2,
                    }}
                  />
                  <p className="text-xs ml-1">Done in time</p>
                </div>
                <p className="text-xs">{member.doneInTime}</p>
              </div>

              <div className="flex justify-between ml-2 mr-3 mt-2">
                <div className="flex">
                  <FiberManualRecordIcon
                    sx={{
                      color: '#F69400',
                      width: 12,
                      height: 12,
                      marginTop: 0.2,
                    }}
                  />
                  <p className="text-xs ml-1">Done in due</p>
                </div>
                <p className="text-xs">{member.doneInDue}</p>
              </div>

              <div className="flex justify-between ml-2 mr-3 mt-2">
                <div className="flex">
                  <FiberManualRecordIcon
                    sx={{
                      color: '#D90000',
                      width: 12,
                      height: 12,
                      marginTop: 0.2,
                    }}
                  />
                  <p className="text-xs ml-1">Overdue</p>
                </div>
                <p className="text-xs">{member.overdue}</p>
              </div>

              <div className="flex mx-2 mt-3">
                <p
                  className="h-1 border-0"
                  style={{
                    width: `${
                      (member.doneInTime * 100) /
                      (member.doneInTime + member.doneInDue + member.overdue)
                    }%`,
                    backgroundColor: '#00980F',
                  }}
                ></p>
                <p
                  className="h-1 border-0"
                  style={{
                    width: `${
                      (member.doneInDue * 100) /
                      (member.doneInTime + member.doneInDue + member.overdue)
                    }%`,
                    backgroundColor: '#F69400',
                  }}
                ></p>
                <p
                  className="h-1 border-0"
                  style={{
                    width: `${
                      (member.overdue * 100) /
                      (member.doneInTime + member.doneInDue + member.overdue)
                    }%`,
                    backgroundColor: '#D90000',
                  }}
                ></p>
              </div>

              <div className="flex mx-2 mt-1 justify-between">
                <p
                  className="text-xs font-bold"
                  style={{color: '#00980F'}}
                >{`${Math.round(
                  (member.doneInTime * 100) /
                    (member.doneInTime + member.doneInDue + member.overdue),
                )}%`}</p>
                <p
                  className="text-xs font-bold"
                  style={{color: '#F69400'}}
                >{`${Math.round(
                  (member.doneInDue * 100) /
                    (member.doneInTime + member.doneInDue + member.overdue),
                )}%`}</p>
                <p
                  className="text-xs font-bold"
                  style={{color: '#D90000'}}
                >{`${Math.round(
                  (member.overdue * 100) /
                    (member.doneInTime + member.doneInDue + member.overdue),
                )}%`}</p>
              </div>

              <div
                className="mx-2 my-3"
                style={{backgroundColor: '#EFEFEF', borderRadius: 4}}
              >
                <p className="text-2xl font-bold ml-3 pt-1.5">{`${Math.round(
                  ((member.doneInDue + member.doneInTime) * 100) /
                    (member.doneInDue + member.doneInTime + member.overdue),
                )}%`}</p>
                <p className="text-xs ml-3 pb-2">Completion Rate</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MemberManagement;
