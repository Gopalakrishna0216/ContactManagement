namespace KnilaAssessMent_APIs.Models
{
    public class ContactViewModel
    {
        public long Id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string email { get; set; }
        public long phoneNumber { get; set; }
        public string address { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public string country { get; set; }
        public long postalCode { get; set; }
        public bool isActive { get; set; }
    }
}
