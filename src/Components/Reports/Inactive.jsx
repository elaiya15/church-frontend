import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useReactToPrint } from 'react-to-print';
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import './pagination.css'; // Ensure this path is correct
const URL = import.meta.env.VITE_BACKEND_API_URL;

import down from './icon/downloade.svg'
import print from './icon/print.svg'
const tableHeading = [
  'Sl. no.',
  'Member ID',
  'Member Name',
  'Inactive Date',
  'Reason',
  'Family ID',
  'Status',
];

const ReportPage = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Zero-based index for pagination
  const [itemsPerPage] = useState(10);
  const [filteredData, setFilteredData] = useState([]);
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const componentRef = useRef();

  const fetchData = async () => {
    try {
      const response = await axios.get(`${URL}/reports/inactive`, {
        params: {
          status: statusFilter !== 'All' ? statusFilter : undefined,
          fromdate: dateRange.from || undefined,
          todate: dateRange.to || undefined,
          search: searchTerm || undefined,
          page: currentPage + 1, // API expects 1-based index
          limit: itemsPerPage,
        },
      });
      setData(response.data.Inactive);
      setFilteredData(response.data.Inactive);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [statusFilter, dateRange, searchTerm, currentPage]);

  useEffect(() => {
    // Reset to page 1 (index 0) when search term changes
    setCurrentPage(0);
  }, [searchTerm]);

  useEffect(() => {
    // Reset to page 1 (index 0) when search term changes
    setCurrentPage(0);
    // console.log("render");
  }, [dateRange]);


  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };


  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    const headers = [
      tableHeading,
    ];
    const rows = filteredData.map((item, index) => [
      index + 1,
      item.member_id,
      item.member_name,
      moment(item.left_date).format('YYYY-MM-DD'),
      item.reason_for_inactive,
      item.secondary_family_id || item.primary_family_id,
      item.status,
    ]);

    doc.autoTable({
      head: headers,
      body: rows,
    });

    doc.save('InActiveReports.pdf');
  };

  // Calculate the offset based on the current page
  const offset = currentPage * itemsPerPage;
  const currentPageData = filteredData.slice(offset, offset + itemsPerPage);

  return (
    <div className="relative h-full ml-5 bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-purple-500">InActiveReports</h2>
          <div className="flex  gap-x-5">
            <button
              onClick={handleDownloadPDF}
              className="mr-4 text-blue-600 cursor-pointer hover:text-blue-800"
            >
             <img src={down}/>
            </button>
            {/* <button onClick={handlePrint} className="text-blue-600 cursor-pointer hover:text-blue-800">
             <img src={print}/>
            </button> */}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 mb-4">
          <div>
            <label className="block mb-1 text-gray-600">Reason</label>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="All">All</option>
              <option value="Death">Death</option>
              <option value="Marriage">Marriage</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 text-gray-600">From</label>
            <input
              type="date"
              value={dateRange.from}
              onChange={e => setDateRange({ ...dateRange, from: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-600">To</label>
            <input
              type="date"
              value={dateRange.to}
              onChange={e => setDateRange({ ...dateRange, to: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-600">Search</label>
            <input
              type="text"
              placeholder="Search members..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>

        <div ref={componentRef}>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                {tableHeading.map(heading => (
                  <th key={heading} className="px-4 py-2 text-left border-b text-base text-gray-700 bg-white dark:bg-gray-700 dark:text-gray-400">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentPageData.map((item, index) => (
                <tr key={index} className="px-2 py-2 text-left border-t border-gray-200">
                  <td className="px-4 text-sm   py-2 ">{offset + index + 1}</td>
                  <td className="px-4 text-sm  py-2 ">{item.member_id}</td>
                  <td className="px-4 text-sm  py-2 ">{item.member_name}</td>
                  <td className="px-4 text-sm  py-2 ">{moment(item.left_date).format('DD-MM-YYYY')}</td>
                  <td className="px-4 text-sm  py-2 ">{item.reason_for_inactive}</td>
                  <td className="px-4 text-sm  py-2 ">{item.secondary_family_id || item.primary_family_id}</td>
                  <td className="px-4 text-sm  py-2 ">
                    <span className={`text-${item.status === 'Active' ? 'green' : 'red'}-500`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <br />
        <div className="flex items-center justify-center select-none">
          <ReactPaginate
            previousLabel={<img className="transform scale-x-[-1]" width="25" height="25" src="https://img.icons8.com/fluency/48/000000/circled-chevron-right.png" alt="circled-chevron-right" />}
            nextLabel={<img width="25" height="25" src="https://img.icons8.com/fluency/48/circled-chevron-right.png" alt="circled-chevron-right" />}
            breakLabel={'...'}
            pageCount={Math.ceil(filteredData.length / itemsPerPage)}
            marginPagesDisplayed={1}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            activeClassName={'active'} // Ensure this matches the CSS class
            forcePage={currentPage} // Ensure the pagination component reflects the current page
          />
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
