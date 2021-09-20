using System;
using System.Collections.Generic;

namespace InimcoDeveloperExercise
{
    public class FullObject
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public List<string> SocialSkills { get; set; }

        public SocialAccount[] SocialAccounts { get; set; }
    }
}
