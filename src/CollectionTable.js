import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const CollectionTable = ({ collection }) => {
  const [sortModel] = useState([
    {
      field: 'artist',
      sort: 'asc',
    },
  ]);
      
  const columns = [
    { field: 'cover', headerName: 'Cover', width: 100, renderCell: (params) => <img className="cover" src={params.value}/> },
    { field: 'artist', headerName: 'Artist', width: 150 },
    { field: 'release', headerName: 'Release', width: 300 },
    { field: 'format', headerName: 'Format', width: 80 },
    { field: 'variant', headerName: 'Variant', width: 200 }
  ];

  if (collection) {
    const rows = collection?.releases?.map(r => {
        return {
            id: r?.basic_information?.id,
            cover: r?.basic_information?.cover_image,
            artist: r?.basic_information?.artists?.[0]?.name,
            release: r?.basic_information?.title,
            format: r?.basic_information?.formats?.[0]?.name,
            variant: r?.basic_information?.formats?.[0]?.text || 'N/A',
        }
    })
    console.log(rows);
    return <DataGrid disableColumnSorting sortModel={sortModel} rowHeight={80} rows={rows} columns={columns} />
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  )
}

export default CollectionTable