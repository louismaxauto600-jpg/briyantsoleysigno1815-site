/*****************************************************************
 PRO-MAX DMP
 OFFICIAL GOVERNANCE CONFIGURATION
 Version: 1.0
******************************************************************/

export const PRO_MAX_GOVERNANCE = {

  system_name: "PRO-MAX DMP",

  official_slogan:
    "DEVAN DEVAN NÈT. BATI POU JODI A. PARE POU DEMEN.",

  super_admins: [
    {
      name: "Max Louis",
      role: "SUPER_ADMIN",
      permissions: ["full_access"]
    },
    {
      name: "Cange",
      role: "SUPER_ADMIN",
      permissions: ["full_access"]
    }
  ],

  firebase_admin_team: [
    {
      name: "Ti La France",
      role: "ADMIN"
    },
    {
      name: "Montina",
      role: "ADMIN"
    },
    {
      name: "Roro Lajan",
      role: "ADMIN"
    },
    {
      name: "Vice Prezidan Tatane",
      role: "ADMIN"
    },
    {
      name: "Valery",
      role: "ADMIN"
    },
    {
      name: "Roberson",
      role: "ADMIN"
    },
    {
      name: "Jij Mayan",
      role: "ADMIN"
    }
  ],

  disciplinary_committee: [
    {
      name: "Ex Prez Aly",
      role: "COMMITTEE_MEMBER"
    },
    {
      name: "Warrens",
      role: "COMMITTEE_MEMBER"
    },
    {
      name: "Michel",
      role: "COMMITTEE_MEMBER"
    },
    {
      name: "Roosevelt",
      role: "COMMITTEE_MEMBER"
    },
    {
      name: "Guypson",
      role: "COMMITTEE_MEMBER"
    },
    {
      name: "Sekretè Ajwen",
      role: "COMMITTEE_MEMBER"
    }
  ],

  spokesperson: {
    name: "Ti La France",
    role: "COMMITTEE_SPOKESPERSON"
  },

  advisory_council: [
    {
      name: "Conseiller_1",
      role: "ADVISOR"
    },
    {
      name: "Conseiller_2",
      role: "ADVISOR"
    },
    {
      name: "Conseiller_3",
      role: "ADVISOR"
    }
  ],

  disciplinary_rules: {
    warning_1: true,
    warning_2: true,
    warning_3: true,

    automatic_case_after_3_warnings: true,

    committee_review_required: true,

    evidence_required: true,

    appeal_process_required: true,

    audit_log_required: true
  },
/*****************************************************************
 PRO-MAX DMP
 OFFICIAL GOVERNANCE CONFIGURATION
 Version: 1.0
******************************************************************/

export const PRO_MAX_GOVERNANCE = {

  system_name: "PRO-MAX DMP",

  official_slogan:
    "DEVAN DEVAN NÈT. BATI POU JODI A. PARE POU DEMEN.",

  super_admins: [
    {
      name: "Max Louis",
      role: "SUPER_ADMIN",
      permissions: ["full_access"]
    },
    {
      name: "Cange",
      role: "SUPER_ADMIN",
      permissions: ["full_access"]
    }
  ],

  firebase_admin_team: [
    {
      name: "Ti La France",
      role: "ADMIN"
    },
    {
      name: "Montina",
      role: "ADMIN"
    },
    {
      name: "Roro Lajan",
      role: "ADMIN"
    },
    {
      name: "Vice Prezidan Tatane",
      role: "ADMIN"
    },
    {
      name: "Valery",
      role: "ADMIN"
    },
    {
      name: "Roberson",
      role: "ADMIN"
    },
    {
      name: "Jij Mayan",
      role: "ADMIN"
    }
  ],

  disciplinary_committee: [
    {
      name: "Ex Prez Aly",
      role: "COMMITTEE_MEMBER"
    },
    {
      name: "Warrens",
      role: "COMMITTEE_MEMBER"
    },
    {
      name: "Michel",
      role: "COMMITTEE_MEMBER"
    },
    {
      name: "Roosevelt",
      role: "COMMITTEE_MEMBER"
    },
    {
      name: "Guypson",
      role: "COMMITTEE_MEMBER"
    },
    {
      name: "Sekretè Ajwen",
      role: "COMMITTEE_MEMBER"
    }
  ],

  spokesperson: {
    name: "Ti La France",
    role: "COMMITTEE_SPOKESPERSON"
  },

  advisory_council: [
    {
      name: "Conseiller_1",
      role: "ADVISOR"
    },
    {
      name: "Conseiller_2",
      role: "ADVISOR"
    },
    {
      name: "Conseiller_3",
      role: "ADVISOR"
    }
  ],

  disciplinary_rules: {
    warning_1: true,
    warning_2: true,
    warning_3: true,

    automatic_case_after_3_warnings: true,

    committee_review_required: true,

    evidence_required: true,

    appeal_process_required: true,

    audit_log_required: true
  },

  membership_rules: {

    admin_can_remove_member: false,

    moderator_can_remove_member: false,

    committee_can_remove_member: false,

    whatsapp_admin_can_remove_member: false,

    removal_requires: [
      "disciplinary_case",
      "evidence",
      "committee_vote",
      "final_decision",
      "audit_log"
    ]
  }
};
  membership_rules: {

    admin_can_remove_member: false,

    moderator_can_remove_member: false,

    committee_can_remove_member: false,

    whatsapp_admin_can_remove_member: false,

    removal_requires: [
      "disciplinary_case",
      "evidence",
      "committee_vote",
      "final_decision",
      "audit_log"
    ]
  }
};
