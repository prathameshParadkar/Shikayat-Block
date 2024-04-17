pragma solidity ^0.8.0;

contract ComplaintContract {
    // Struct to represent a complaint
    struct ComplaintContract {
        string userId; // User ID of the complainant
        uint256 complaintGroupId; // Group ID of the complaint
        uint256 complaintId; // Complaint ID
        string subject; // Subject of the complaint
        string description; // Description of the complaint
        string complaintType; // Description of the complaint
        string ipfsHash; // IPFS hash of the complaint details
        string date;
        string status;
        string statusType;
        string authorityName;
        uint256 priority;
    }

    // Mapping to store complaints
    mapping(uint256 => ComplaintContract) public complaints;

    uint256 public complaintCount;

    mapping(string => uint256[]) public complaintsByAuthorityName;
    uint256 public complaintGroupCount;

    mapping(string => uint256[]) public complaintsByComplaintType;

    event NewComplaint(
        string userId,
        uint256 indexed complaintGroupId,
        uint256 indexed complaintId,
        string subject,
        string description,
        string complaintType,
        string ipfsHash,
        string date,
        string status,
        string statusType,
        string authorityName,
        uint256 priority
    );

    // Function to submit a new complaint
    function submitComplaint(
        string memory _userId,
        string memory _subject,
        string memory _description,
        string memory _complaintType,
        string memory _ipfs,
        string memory _status,
        string memory _statusType,
        string memory _authorityName,
        string memory _date,
        uint256 _priority
    ) public {
        // Incrementing complaint count
        complaintCount++;
        complaintGroupCount++;

        // Creating a new complaint object
        ComplaintContract memory newComplaint = ComplaintContract({
            userId: _userId,
            complaintGroupId: complaintGroupCount,
            complaintId: complaintCount,
            subject: _subject,
            description: _description,
            complaintType: _complaintType,
            ipfsHash: _ipfs,
            status: _status,
            date: _date,
            statusType: _statusType,
            authorityName: _authorityName,
            priority: _priority
        });

        complaints[complaintCount] = newComplaint;

        complaintsByComplaintType[_complaintType].push(complaintCount);

        complaintsByAuthorityName[_authorityName].push(complaintCount);

        // Emitting event
        emit NewComplaint(
            _userId,
            complaintGroupCount,
            complaintCount,
            _subject,
            _description,
            _complaintType,
            _ipfs,
            _date,
            _status,
            _statusType,
            _authorityName,
            _priority
        );
    }

    function updateComplaint(
        string memory _userId,
        uint256 complaintGroupId,
        string memory _subject,
        string memory _description,
        string memory _complaintType,
        string memory _ipfs,
        string memory _status,
        string memory _statusType,
        string memory _authorityName,
        string memory _date,
        uint256 _priority
    ) public {
        // Incrementing complaint count for the new complaint object
        complaintCount++;

        // Creating a new complaint object for the updated information
        ComplaintContract memory newComplaint = ComplaintContract({
            userId: _userId,
            complaintGroupId: complaintGroupId,
            complaintId: complaintCount,
            subject: _subject,
            description: _description,
            complaintType: _complaintType,
            ipfsHash: _ipfs,
            status: _status,
            date: _date,
            statusType: _statusType,
            authorityName: _authorityName,
            priority: _priority
        });

        complaints[complaintCount] = newComplaint;
        complaintsByComplaintType[_complaintType].push(complaintCount);
        complaintsByAuthorityName[_authorityName].push(complaintCount);

        emit NewComplaint(
            _userId,
            complaintGroupCount,
            complaintCount,
            _subject,
            _description,
            _complaintType,
            _ipfs,
            _date,
            _status,
            _statusType,
            _authorityName,
            _priority
        );
    }

    // Function to retrieve complaint details using complaint ID
    function getComplaint(
        uint256 _complaintId
    )
        public
        view
        returns (
            string memory,
            uint256,
            string memory,
            string memory,
            string memory,
            // string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            uint256
        )
    {
        ComplaintContract memory complaint = complaints[_complaintId];
        return (
            complaint.userId,
            complaint.complaintGroupId,
            complaint.subject,
            complaint.description,
            complaint.complaintType,
            complaint.ipfsHash,
            complaint.date,
            complaint.status,
            complaint.statusType,
            complaint.authorityName,
            complaint.priority
        );
    }

    // Function to retrieve latest complaint ID
    function getLatestComplaintId() public view returns (uint256) {
        return (complaintCount);
    }

    // Function to get complaints by complaint type
    function getComplaintsByComplaintType(
        string memory _complaintType
    ) public view returns (uint256[] memory) {
        return complaintsByComplaintType[_complaintType];
    }

    function getComplaintsByAuthorityName(
        string memory _authorityName
    ) public view returns (uint256[] memory) {
        return (complaintsByAuthorityName[_authorityName]);
    }
}
