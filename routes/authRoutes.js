const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { register, login, getMe, getAllUsers } = require("../controllers/authController");
const { protect, authorize } = require("../middleware/authMiddleware");

// ─── Validation Rules ──────────────────────────────────────────────────────

const registerValidation = [
  body("username")
    .trim()
    .notEmpty().withMessage("Username is required")
    .isLength({ min: 3 }).withMessage("Username must be at least 3 characters")
    .isLength({ max: 30 }).withMessage("Username cannot exceed 30 characters"),

  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please provide a valid email address")
    .normalizeEmail(),

  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

const loginValidation = [
  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please provide a valid email address"),

  body("password")
    .notEmpty().withMessage("Password is required"),
];

// ─── Routes ───────────────────────────────────────────────────────────────

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post("/register", registerValidation, register);

/**
 * @route   POST /api/auth/login
 * @desc    Login and receive JWT
 * @access  Public
 */
router.post("/login", loginValidation, login);

/**
 * @route   GET /api/auth/me
 * @desc    Get current logged-in user info
 * @access  Private — requires Bearer token
 */
router.get("/me", protect, getMe);

/**
 * @route   GET /api/auth/users
 * @desc    Get all users (admin only)
 * @access  Private/Admin — requires Bearer token + admin role
 */
router.get("/users", protect, authorize("admin"), getAllUsers);

module.exports = router;
