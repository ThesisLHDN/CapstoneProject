import React from 'react';
import {Avatar} from '@mui/material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

function MemberManagement({data}) {
  return (
    <div style={{border: '1px solid #787878', borderRadius: 16}}>
      <div className="flex">
        <p className="text-left text-tg-text-color font-bold text-base mt-8 mx-6">
          Member Performance
        </p>
        <SettingsOutlinedIcon sx={{marginTop: 3.75, cursor: 'pointer'}} />
      </div>
      <p className="text-sm italic ml-6 mt-4">
        Manage workload and effort of each member through issues and points.
      </p>

      <div className="flex mt-6 mb-4 overflow-auto ml-6">
        {data.map((member) => {
          return (
            <div
              className="xl:mb-2 2xl:mb-10 2xl:mt-5 3xl:mt-7 3xl:mb-16"
              key={member.id}
              style={{
                border: '1px solid gray',
                borderRadius: 8,
                minWidth: 190,
                marginRight: 8,
              }}
            >
              <div className="flex xl:mt-4 xl:ml-3 3xl:mt-6">
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

              <div className="flex justify-between ml-2 mr-3 mt-5">
                <div className="flex">
                  <FiberManualRecordIcon
                    sx={{
                      color: 'gray',
                      width: 12,
                      height: 12,
                      marginTop: 0.2,
                    }}
                  />
                  <p className="text-xs ml-1">Total issues</p>
                </div>
                <p className="text-xs">{member.doneInTime} (xx points)</p>
              </div>

              <div className="flex justify-between ml-2 mr-3 xl:mt-3 3xl:mt-4">
                <div className="flex">
                  <FiberManualRecordIcon
                    sx={{
                      color: '#ff0000',
                      width: 12,
                      height: 12,
                      marginTop: 0.2,
                    }}
                  />
                  <p className="text-xs ml-1">To Do</p>
                </div>
                <p className="text-xs">{member.doneInTime} (xx points)</p>
              </div>

              <div className="flex justify-between ml-2 mr-3 xl:mt-3 3xl:mt-4">
                <div className="flex">
                  <FiberManualRecordIcon
                    sx={{
                      color: '#006BA7',
                      width: 12,
                      height: 12,
                      marginTop: 0.2,
                    }}
                  />
                  <p className="text-xs ml-1">In progress</p>
                </div>
                <p className="text-xs">{member.doneInDue} (xx points)</p>
              </div>

              <div className="flex justify-between ml-2 mr-3 xl:mt-3 3xl:mt-4">
                <div className="flex">
                  <FiberManualRecordIcon
                    sx={{
                      color: '#EC8E00',
                      width: 12,
                      height: 12,
                      marginTop: 0.2,
                    }}
                  />
                  <p className="text-xs ml-1">Testing</p>
                </div>
                <p className="text-xs">{member.doneInDue} (xx points)</p>
              </div>

              <div className="flex justify-between ml-2 mr-3 xl:mt-3 3xl:mt-4">
                <div className="flex">
                  <FiberManualRecordIcon
                    sx={{
                      color: '#009606',
                      width: 12,
                      height: 12,
                      marginTop: 0.2,
                    }}
                  />
                  <p className="text-xs ml-1">Done</p>
                </div>
                <p className="text-xs">{member.overdue} (xx points)</p>
              </div>

              <div className="flex mx-2 xl:mt-5 3xl:mt-7">
                <p
                  className="h-1.5 border-0"
                  style={{
                    width: `${
                      (member.doneInTime * 100) /
                      (member.doneInTime + member.doneInDue + member.overdue)
                    }%`,
                    backgroundColor: '#00980F',
                  }}
                ></p>
                <p
                  className="h-1.5 border-0"
                  style={{
                    width: `${
                      (member.doneInDue * 100) /
                      (member.doneInTime + member.doneInDue + member.overdue)
                    }%`,
                    backgroundColor: '#F69400',
                  }}
                ></p>
                <p
                  className="h-1.5 border-0"
                  style={{
                    width: `${
                      (member.overdue * 100) /
                      (member.doneInTime + member.doneInDue + member.overdue)
                    }%`,
                    backgroundColor: '#D90000',
                  }}
                ></p>
              </div>

              <div className="flex mx-2 mt-1.5 xl:mb-5 3xl:mb-7 justify-between">
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
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MemberManagement;
