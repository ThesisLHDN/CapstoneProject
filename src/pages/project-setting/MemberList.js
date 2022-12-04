import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

function createData(name, email, role) {
  return { name, email, role };
}
  
const members = [
  createData('Nguyễn Trường Hải Đăng', 'dangngngng@gmail.com', 'Administrator'),
  createData('Nguyễn Hoàng Lâm', 'lamngngng@gmail.com', 'Project Owner'),
  createData('Nguyễn Văn A', 'aaaaa@gmail.com', 'Team Member')
]

function MemberList() {
  return (
    <div style={{ width: "95%" }}>
      <TableContainer component={Paper} sx={{ marginLeft: 6, marginY: 2}}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700 }}>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.name}>
                <TableCell component="th" scope="row">{member.name}</TableCell>
                <TableCell component="th" scope="row">{member.email}</TableCell>
                <TableCell align="right">
                  <Button 
                    style={{ 
                      display: "inline-flex",
                      textTransform: "none",
                      height: 40,
                      width: 165,
                      borderRadius: 3,
                      backgroundColor: "#ECECEC",
                      color: "black",
                      justifyContent: "space-between"
                  }}>
                    <span className='pl-5'>{member.role}</span>
                    <ExpandMoreIcon style={{ display: "inline-flex", alignItems: "flex-end"}}/>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default MemberList